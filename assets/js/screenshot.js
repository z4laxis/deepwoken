function report(region) {
    let div = document.querySelector(region);
    html2canvas(div, {
        onrendered: function (canvas) {
            let pngUrl = canvas.toDataURL();
            let img = document.querySelector(".export");
            img.src = pngUrl;
        },
    });
}