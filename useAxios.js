import React, { useState, useEffect } from "react";
import defaultAxios from "axios";

export const useAxios = (opts, axiosInstance = defaultAxios) => {
    //1. 데이터 상태를 관리하는 useState생성
    const [req, setReq] = useState({
        loading: true,
        data: null,
        error: null
    });

    //4. refetch를 위해서 useEffect가 바라볼 대상(상태정보)를 만든다.
    const [reFetch, setReFetch] = useState(0);

    //2. 인수로 전달받은 값에 url이 없으면 리턴
    if (!opts.url) return;

    const onRefetch = () => {
        //6. refetch를 위해서 로딩 true
        setReq({
            ...req,
            loading: true
        });

        //7. 재실행을 위해서 reFetch의 상태를 변화시킴(페이크)
        setReFetch(Date.now());
    };

    //3. 데이터를 받아오는 useEffect생성 (에러처리포함)
    useEffect(() => {
        axiosInstance(opts)
            .then((dataObj) => {
                setReq({
                    ...req,
                    loading: false,
                    data: dataObj
                });
            })
            .catch((errorObj) => {
                setReq({ ...req, loading: false, error: errorObj });
            });
        //5. deps에 바라볼 대상 연결
    }, [reFetch]);

    return { ...req, onRefetch };
};

//받아올 페이지의 코드
/*
const { loading, data, error, onRefetch } = useAxios({
    url: "https://yts.mx/api/v2/list_movies.json"
});
*/
