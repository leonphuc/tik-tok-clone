import React, { useEffect, useRef, useState } from 'react';

function TestA({ props }) {
    let [forYou, setForYou] = useState([]);
    const [accountValue, setAccountValue] = useState('');
    const [pageValue, setPageValue] = useState(2);

    function* generatorFunc(pageValue) {
        while (pageValue < 5) {
            yield pageValue++;
        }
    }
    return async function fetchData() {
        for await (const num of generatorFunc(pageValue)) {
            fetch(`https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=${num}`)
                .then((res) => res.json())
                .then((res) => {
                    setForYou((forYou) => [...forYou, ...res.data]);
                });
        }
    };
}

export default TestA;
