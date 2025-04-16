#include <stdio.h>

int main() {
    int last = 0;
    int seclast = 1;
    int val = 0;

    int iter = 10;

    for(int i = 0; i < iter; i++) {
        val = seclast + last;
        
        seclast = last;
        last = val;
    }

    printf("%d", val);

    return 1;
}