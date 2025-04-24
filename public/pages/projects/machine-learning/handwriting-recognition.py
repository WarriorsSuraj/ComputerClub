import tkinter as tk
from PIL import Image, ImageDraw
import easyocr
import cv2

# change based on screen resolution (idk how to find screen resolution)

root = tk.Tk()
root.title("handwriting recognition tool")

width, height = 800, 600

canvas = tk.Canvas(root, width=width, height=height)
canvas.pack()

# "L" sets to grayscale i think
image1 = Image.new("L", (width, height), color=255)
draw = ImageDraw.Draw(image1)

# init easyocr reader
reader = easyocr.Reader(["en"], gpu=True) # add language support in brackets, gpu set to true since it automatically falls back

# labels
statuslabel = tk.Label(root, text="status: ready")
statuslabel.pack()

reslabel = tk.Label(root, text="text: null")
reslabel.pack()

debuglabel = tk.Label(root, text="debug info: null")
debuglabel.pack()

# store last mouse coords
lastx, lasty = None, None

def drawlines(ev):
    # no idea how global works at all
    global lastx, lasty

    # update status label
    statuslabel.config(text=f"status: drawing ({ev.x}, {ev.y})")

    x, y = max(0, min(ev.x, width)), max(0, min(ev.y, height))

    if lastx is not None and lasty is not None:
        # draw!!!!
        canvas.create_line(lastx, lasty, x, y, fill="black", width=8)
        draw.line((lastx, lasty, x, y), fill=0, width=8)

    lastx, lasty = x, y

def initdrawing(ev):
    global lastx, lasty

    lastx, lasty = max(0, min(ev.x, width)), max(0, min(ev.y, height))

def stopdrawing(_):
    global lastx, lasty

    lastx, lasty = None, None

    statuslabel.config(text="status: ready")

def processimage(imgpath):
    # load
    img = cv2.imread(imgpath, cv2.IMREAD_GRAYSCALE)
    # enhance contrast
    img = cv2.equalizeHist(img)
    # reduce noise (found on docs)
    # img = cv2.GaussianBlur(img, (3, 3), 0)
    # "Apply adaptive thresholding for better binarization"
    img = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,  cv2.THRESH_BINARY_INV, 11, 2)

    cv2.imwrite("processed_img.png", img)
    return img

def interprettext(imgpath):
    processedimg = processimage(imgpath)

    temppath = "temp_processed.png"
    cv2.imwrite(temppath, processedimg)

    res = reader.readtext(temppath, detail=0.8)
    debuglabel.config(text=f"debug info: {res}")

    # what the **** is this contraption
    text = " ".join([ress[1] for ress in res]) if res else "nothing detected"

    return text

def save():
    image1.save("t.png")
    
    image1.resize((28, 28)).save("t_28x28.png")
    
    try:
        recognized_text = interprettext("t.png")
        reslabel.config(text=f"res: {recognized_text}")
    except Exception as e:
        reslabel.config(text="error")
        debuglabel.config(text=f"debug error: {str(e)}")

def clear():
    canvas.delete("all")
    draw.rectangle([0, 0, width, height], fill=255)
    reslabel.config(text="res: null")
    statuslabel.config(text="status: ready")
    debuglabel.config(text="debug info: null")

canvas.bind("<Button-1>", initdrawing)
canvas.bind("<B1-Motion>", drawlines)
canvas.bind("<ButtonRelease-1>", stopdrawing)

tk.Button(root, text="interpret", command=save).pack()
tk.Button(root, text="clear", command=clear).pack()

root.mainloop()