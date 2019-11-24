import * as Constants from "./../utils/Constants";

export const getOperation = async (url) => (    
    await fetch(Constants.baseURL + url, {
        method: `GET`,
        credentials: `include`,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        return new Promise((resolve) => {
            resolve(data);
        });
    }));

    export const deleteOperation = async (id) => (        
        await fetch(Constants.baseURL + 'product', {
            method: `DELETE`,
            credentials: `include`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"_id":id.productId})
        })
        .then(function (response) {
            console.log("response",response);
            console.log("id",id);

            return response.json();
        })
        .then(function (data) {
            console.log("data",data);
        console.log("id",id);
            
            return new Promise((resolve) => {
                resolve(data);
            });
        }));
export default {

    get: async (apiUrl, param) => {
        let response = await fetch(Constants.baseURL + 'product', {
            method: `GET`,
            credentials: `include`,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        var resObj;
        if (response.status === 200) {
            resObj = {
                response: response,
                success: true
            };
            return await resObj;
        } else {
            resObj = {
                response: response,
                success: false
            };
            return await resObj;
        }

    },

    post: () => {

    },

    put: () => {

    },

    delete: async (body) => {
        console.log("----body from rest client", body);
        let response = await fetch(Constants.baseURL + 'product', {
            method: `DELETE`,
            credentials: `include`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        var resObj;
        if (response.status === 200) {
            resObj = {
                response: response,
                success: true
            };
            return await resObj;
        } else {
            resObj = {
                response: response,
                success: false
            };
            return await resObj;
        }
    }
}