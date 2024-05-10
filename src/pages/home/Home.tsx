import Layout from "../../layout/Layout.tsx";
import {getPosts} from "../../api/api.ts";
import PostCard from "../../components/cards/PostCard.tsx";
import {useQuery} from "@tanstack/react-query";

const Home = () => {

    const {data, error, isSuccess} = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
    });

    if (!isSuccess) {
        return <span>Loading...</span>
    } else if (error) {
        return <span>Error when fetching posts...</span>
    } else {

        return (
            <Layout>
                {data?.map(post => <PostCard data={post} key={post.id}/>)}
            </Layout>
        );
    }
};

export default Home;