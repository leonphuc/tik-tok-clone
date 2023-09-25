import { useEffect, useState } from 'react';
import HomeItems from './HomeItems';
import HomeContent from './HomeItems/HomeContent';
import GoogleLoginFFC from '~/components/Login/GoogleLogin/GoogleLoginFFC';
import AuthAccount from '~/components/AuthAccount';
import LazyLoad from 'react-lazyload';
import AuthDetail from '~/components/AuthAccount/AuthDetail';

function Home() {
    let [forYou, setForYou] = useState([]);
    const [accountValue, setAccountValue] = useState('');
    const [pageValue, setPageValue] = useState(2);

    function* generatorFunc(pageValue) {
        while (pageValue < 5) {
            yield pageValue++;
        }
    }

    async function fetchData() {
        await fetch(`https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=1`)
            .then((res) => res.json())
            .then((res) => {
                setForYou(res.data);
            });
        for await (const num of generatorFunc(pageValue)) {
            fetch(`https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=${num}`)
                .then((res) => res.json())
                .then((res) => {
                    setForYou((forYou) => [...forYou, ...res.data]);
                });
        }
    }

    useEffect(() => {
        fetchData();
    }, [accountValue]);

    forYou = forYou.filter(function (value, index, array) {
        return array.findIndex((v) => v.user_id === value.user_id) === index;
    });

    return (
        <LazyLoad height={762} width={400} threshold={0.9}>
            <div>
                {/* <AuthDetail /> */}
                <HomeContent>
                    {forYou.map((result) => (
                        <HomeItems key={result.user_id} data={result} forYou={forYou} />
                    ))}
                </HomeContent>
            </div>
        </LazyLoad>
    );
}

export default Home;
