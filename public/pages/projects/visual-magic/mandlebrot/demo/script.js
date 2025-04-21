/*
INITIALIZE canvas with width W and height H
SET X_MIN = -2.00, X_MAX = 0.47  // Mandelbrot X range
SET Y_MIN = -1.12, Y_MAX = 1.12  // Mandelbrot Y range
SET MAX_ITERATION = 1000         // Maximum iterations for escape check

FUNCTION getColor(iteration)
    IF iteration = MAX_ITERATION THEN
        RETURN color(0, 0, 0)    // Black for points in the set
    ELSE
        SET hue = (iteration MOD 360) / 360  // Map iteration to hue (0 to 1)
        SET saturation = 1.0
        SET value = 1.0
        CONVERT HSV(hue, saturation, value) to RGB(r, g, b)
        RETURN color(r * 255, g * 255, b * 255)
    END IF
END FUNCTION

FUNCTION mandelbrotPixel(px, py)
    // Scale pixel coordinates to Mandelbrot complex plane
    SET x0 = X_MIN + (X_MAX - X_MIN) * px / W
    SET y0 = Y_MIN + (Y_MAX - Y_MIN) * py / H
    SET x = 0.0
    SET y = 0.0
    SET iteration = 0

    // Iterate to check if point escapes
    WHILE (x * x + y * y ≤ 4) AND (iteration < MAX_ITERATION) DO
        SET xtemp = x * x - y * y + x0
        SET y = 2 * x * y + y0
        SET x = xtemp
        INCREMENT iteration
    END WHILE

    RETURN getColor(iteration)
END FUNCTION

PROCEDURE renderMandelbrot
    FOR py = 0 TO H - 1 DO
        FOR px = 0 TO W - 1 DO
            SET color = mandelbrotPixel(px, py)
            PLOT pixel at (px, py) with color
        END FOR
    END FOR
    DISPLAY canvas
END PROCEDURE

CALL renderMandelbrot
*/