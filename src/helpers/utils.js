const getPublishedDate = timeStamp => {
    const newDate = new Date(timeStamp);
    return newDate?.getDate() +"/"+ newDate?.getMonth() + '/'+ newDate?.getFullYear();
};

const scrollReachedBottom = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const documentBody = document.body;
    const elementInDocument = document.documentElement;
    const docHeight = Math.max(
        documentBody.scrollHeight,
        documentBody.offsetHeight,
        elementInDocument.clientHeight,
        elementInDocument.scrollHeight,
        elementInDocument.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    return windowBottom >= docHeight;
};

export {
    getPublishedDate,
    scrollReachedBottom,
};
