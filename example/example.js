let count = 0;

function example() {
    console.log("Example");

    if (count < 3) {
        setTimeout(example, 1000);
        count++;
    }
}

setTimeout(example, 1000);