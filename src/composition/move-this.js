const move = () => {

    const moveThis = (target, e, width, height) => {
        target.style.left = e.clientX - width / 2 + 'px';
        target.style.top = e.clientY - height / 2 + 'px';
    }

    const grabThis = (target, e, width, height) => {
        target.style.left = e.touches[e.touches.length - 1].clientX - width / 2 + 'px';
        target.style.top = e.touches[e.touches.length - 1].clientY - height / 2 + 'px';
    }
    return {
        moveThis,
        grabThis
    }
}
export default move