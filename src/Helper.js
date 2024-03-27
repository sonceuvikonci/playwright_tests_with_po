export function getRandomUniqueNumbersArray(max) {
    const randomNumArr = [];
    while (randomNumArr.length < max) {
        const random = Math.floor(Math.random() * 5);
        if (randomNumArr.indexOf(random) === -1) {
            randomNumArr.push(random);
        }
    }
    return randomNumArr;
}
