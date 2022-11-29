/**
 * Creates random array from `arr` values.
 * The length of the returned random array is based on `randomLength`.
 * 
 * @param {Array.<T>} arr - the array to get random values from 
 * @param {number} randomLength - the returned array length
 * @param {T} excludeValue - one value to not include in the random array
 * @returns 
 */
const getRandomArray = async (arr, randomLength, excludeValue) => {
    const filteredClientIds = arr.filter(
        (clientId) => excludeValue != clientId
    );

    if (randomLength >= filteredClientIds.length) {
        return filteredClientIds;
    }

    const selectedIds = {};

    while (Object.keys(selectedIds).length < randomLength) {
        const index = Math.floor(Math.random() * filteredClientIds.length);
        const id = filteredClientIds[index];
        selectedIds[index] = id;
    }

    return Object.values(selectedIds);
};

module.exports = {
    getRandomArray
}