const axios = require('axios');


export class HelixApi {
    channelId: any;
    baseHeaders: any;
    baseUrl: any;

    constructor( baseUrl, baseHeaders, channelId ) {
        this.baseUrl = baseUrl;
        this.baseHeaders = baseHeaders;
        this.channelId = channelId;
    }

    async getUser(userName: String) {
        const url = this.baseUrl + "users?login=" + userName;
        const response = await axios.get(url, { headers: this.baseHeaders });
        return response;
    }

    async getFollowage(userId: String, channel: String) {
        try {
            const url = this.baseUrl + "users/follows?to_id=" + userId;
            const response = await axios.get(url, { headers: this.baseHeaders });
            return response.data;
        } catch (ignore) {
            console.error(ignore);
        }
    }

    async getStreamTime(streamId: String) {
        const url = this.baseUrl + "streams?user_id=" + streamId;
        return await axios.get(url, { headers: this.baseHeaders });
    }
}