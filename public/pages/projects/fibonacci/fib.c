/*
README:

This implementation of the fibonacci sequence only works for smaller numbers (approx < 80th iter).
If you want to calculate numbers of greater magnitude, use matrix exponentiation.

*/

#include <stdio.h>

int main() {
    int seclast = 0;
    int last = 1;
    int val = 0;

    int iter = 7; //  n'th fibonacci number

    for(int i = 0; i < iter; i++) {
        seclast = last;
        last = val;

        val = seclast + last;
    }

    printf("%d", val);

    return 0;
}