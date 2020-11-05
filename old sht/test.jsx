// LW
// Check this
// https://reactjs.org/docs/refs-and-the-dom.html
import React, { useRef ,useImperativeHandle} from 'react';
const Child1 = React.forwardRef((props, ref) => {
    return <div ref={ref}>Childssssssss1</div> 
});

const Child2 = React.forwardRef((props, ref) => {
    const handleClick= () =>{};
    useImperativeHandle(ref,() => ({
       handleClick
    }))
    return <div>Child2</div> 
});
const Tester = () => {
    const child1 = useRef(null);
    const child2 = useRef(null);

    return (
        <>
           <Child1 ref={child1} />
           <Child1 ref={child1} />
        </>
    )
}
export default Tester;