import './Hotrank.css'

export default function Hotrank({ handleSelect }) {
    return (
        <section style={{marginTop: '3 rem'}} className='hotrank'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-10'>
                        <div className="bg-white p-3 shadow-sm">
                            <h4 className="mb-3">熱門行政區</h4>
                            <button className='btn px-4 btn-1' onClick={() => handleSelect('苓雅區')}>苓雅區</button>
                            <button className='btn px-4 btn-2' onClick={() => handleSelect('三民區')}>三民區</button>
                            <button className='btn px-4 btn-4' onClick={() => handleSelect('鳳山區')}>鳳山區</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
