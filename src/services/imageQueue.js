const processingQueue = [];

const addJob = (job) => {
    processingQueue.push(job);
};

const getJob = () => {
    return processingQueue.shift();
};

module.exports = {
    addJob,
    getJob
};