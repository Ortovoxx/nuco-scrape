const axios = require('axios');
const FormData = require('form-data');

const { cookie, btoken, bookingCode } = require('./config');

const checkRoom = async (room) => {

    const data = new FormData();

    data.append('method', 'query');
    data.append('id', room);
    data.append('booking', bookingCode);
    data.append('btoken', btoken);

    const res = await axios({
        method: 'post',
        url: 'https://allocation.nucotravel.com/api/allocsubblock',
        headers: {
            'Cookie': cookie,
            ...data.getHeaders(),
        },
        data: data
    }).catch(console.error);

    return res?.data
}

module.exports = checkRoom;