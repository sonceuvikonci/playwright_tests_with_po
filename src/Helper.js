export function getRandomUniqueNumbersArray(max) {
    const randomNumArr = [];
    while (randomNumArr.length < max) {
        const random = Math.floor(Math.random() * max);
        if (randomNumArr.indexOf(random) === -1) {
            randomNumArr.push(random);
        }
    }
    return randomNumArr;
}

export function sortArrayBy(array, criteria) {
    const arrayToSort = array;
    switch (criteria) {
        case 'Price (low to high)':
            arrayToSort.every((value, index, arr) => index === 0 || value >= arr[index - 1]);
            break;
        case 'Price (high to low)':
            arrayToSort.every((value, index, arr) => index === 0 || value <= arr[index - 1]);
            break;
        case 'Name (A to Z)':
            arrayToSort.sort();
            break;
        case 'Name (Z to A)':
            arrayToSort.sort().reverse();
            break;
        default:
            throw new Error('Incorrect sorting criteria!');
    }
    return arrayToSort;
}
