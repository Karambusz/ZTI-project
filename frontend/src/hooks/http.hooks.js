import {useCallback } from "react";

export const useHttp = () => {

    const request = useCallback(async (url, method = 'GET', body = null, clientToken = null) => {
		const headers = clientToken !== null ? {
			'Content-type': 'application/json',
			'Authorization': 'Bearer ' + clientToken
		} :
		{
			'Content-type': 'application/json'
		}
        try {
            const response = await fetch(url, {method, body, headers});

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    }, []);


    return {request}
}