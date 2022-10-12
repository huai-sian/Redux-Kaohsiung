import loadingImg from '../img/Dual_Ball.gif'

import './Loading.css'
import styled from '@emotion/styled'

const LoadingFrame = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 50;
    background-color: white;
`;

const Img = styled.img`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export default function Loading() {
    return (
        <LoadingFrame>
            <Img src={loadingImg} alt=""/>
        </LoadingFrame>
    )
}
