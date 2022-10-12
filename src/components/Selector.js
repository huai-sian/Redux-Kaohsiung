import { useState, useEffect } from 'react'
import './Selector.css'

export default function Header({data, handleSelect, selected}) {
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('')

    useEffect(() => {
        const list  = []
        data.forEach(item => list.push(item.Zone))
        const temp = list.filter((element, index, array) =>
            array.indexOf(element) === index
        );
        setLocations(temp)
    }, [data])

    useEffect(() => {
        setSelectedLocation(selected)
    }, [selected])

    if(data.length === 0) {
        return (<div className="error">No data to load...</div>)
    }

    return (
        <select value={selectedLocation} className="area-selector mb-4" onChange={(e) => {handleSelect(e.target.value); setSelectedLocation(e.target.value)}}>
            <option value="">--全部區域--</option>
            { data && locations.map(item => <option value={item} key={item}>{item}</option>)}
        </select>
    )
}
