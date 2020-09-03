export default function(pictureList=[], action) {
    if(action.type == "addPicture") {
        return [...pictureList, {url: action.url, attributes: action.attributes}];
    } else {
        return pictureList;
    }
}