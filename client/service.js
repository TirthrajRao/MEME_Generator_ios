import Config from './config';

export default {

/** Show category name */
    showCategoryName : () => {
        const url = Config.baseurl + "category"

        return fetch(url).
            then((response) => response.json())
            .catch({ status: 500, message: 'Internal Server Error' });
    },

/** @param {string} data:name of category and download category wise stickers */
    DownloadStickers : (data) => {
        const url = Config.baseurl + "stickers/" + data

        return fetch(url).
            then((response) => response.json())
            .catch({ status: 500, message: 'Internal Server Error' });
    },
   
}
