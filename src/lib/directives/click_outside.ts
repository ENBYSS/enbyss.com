export const clickOutside = (node: any) => {
    const handleClick = (event: any) => {
        if (!node.contains(event.target)) {
            node.dispatchEvent(
                new CustomEvent('click_outside', node)
            );
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}