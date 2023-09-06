function getColor(colorArr){
    return "rgb(" + colorArr[0] + "," + colorArr[1] + "," + colorArr[2] + ")";
}

function getColorV(colorV) {
    return "rgb(" + colorV.x + "," + colorV.y + "," + colorV.z + ")";
}

export { getColor, getColorV };