import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectLoading, setLoading as setLoadingOriginal } from "../redux/reducers/LoadingSlice";

const useLoading = () => {
    const loading = useAppSelector(selectLoading);
    const dispatch = useAppDispatch();

    const setLoading = (payload: boolean) => dispatch(setLoadingOriginal(payload))

    return [
        loading,
        setLoading
    ]
};

export default useLoading;
