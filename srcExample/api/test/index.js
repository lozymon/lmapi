export default {
    get_test(req, res) {
        return { message: 'test' };
    },
    post_test(req, res) {
        res.send(JSON.stringify({ message: 'post_test' }))
    },
};