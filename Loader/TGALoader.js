
function TGALoader(){


    function tgaCheckHeader(header){}

    function tgaParse(){}

    function tgaGetImageData8bits(){}
    function tgaGetImageData16bits(){}
    function tgaGetImageData24bits(){}
    function tgaGetImageData32bits(){}
    function tgaGetImageDataGrey8bits(){}
    function tgaGetImageDataGrey16bits(){}
    function getTgaRBA(){}

    const TGA_TYPE_NO_DATA = 0,
        TGA_TYPE_INDEXED = 1,
        TGA_TYPE_RGB = 2,
        TGA_TYPE_GREY = 3,
        TGA_TYPE_RLE_INDEXED = 9,
        TGA_TYPE_RLE_RGB = 10,
        TGA_TYPE_RLE_GREY = 11,

        TGA_ORIGIN_MASK = 0x30,
        TGA_ORIGIN_SHIFT = 0x04,
        TGA_ORIGIN_BL = 0x00,
        TGA_ORIGIN_BR = 0x01,
        TGA_ORIGIN_UL = 0x02,
        TGA_ORIGIN_UR = 0x03;
    
    



}