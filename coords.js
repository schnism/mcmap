// /home/kf/mcmap/main.js
// define a change handler that reads the value of a text input

function handleTextChange(event) {
    const value = event?.target?.value ?? '';
    const mode = event.target.id;

    try {

        var nx, ny, nz, ox, oy, oz;

        var coords = value.match(/([-\.\d]+)[^-\.\d]+([-\.\d]+)[^-\.\d]+([-\.\d]+)/);
        if (coords === null) {
            coords = value.match(/([-\.\d]+)[^-\.\d]+([-\.\d]+)/);
            coords[3] = coords[2];
            coords[2] = 64;
            
        }


        console.log(coords);
        console.log(mode);

        if (mode === 'nether') {
            nx = Math.round(coords[1]);
            ny = Math.round(coords[2]);
            nz = Math.round(coords[3]);

            ox = Math.round(nx * 8);
            oy = ny;
            oz = Math.round(nz * 8);

            document.getElementById('overworld').value = `${ox} ${oy} ${oz}`;



        }

        if (mode === 'overworld') {
            ox = Math.round(coords[1]);
            oy = Math.round(coords[2]);
            oz = Math.round(coords[3]);

            nx = Math.round(ox / 8);
            ny = oy;
            nz = Math.round(oz / 8);
            document.getElementById('nether').value = `${nx} ${ny} ${nz}`;

        }


        document.getElementById('overworldt').innerText = `x=${ox} y=${oy} z=${oz}`;
        document.getElementById('nethert').innerText = `x=${nx} y=${ny} z=${nz}`;
        document.getElementById('omap').src = `https://maps.schnism.net/#overworld:${ox}:${oy}:${oz}:200:0:0:0:1:flat`;
        document.getElementById('nmap').src = `https://maps.schnism.net/#nether:${nx}:${ny}:${nz}:200:0:0:0:1:flat`;


    } catch (e) {
        document.getElementById('overworldt').innerText = ``;
        document.getElementById('nethert').innerText = ``;
    }




    //document.getElementById('overworldt').textContent = `x=${value} y=64 z=${value}`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('overworld').addEventListener('change', handleTextChange);
    document.getElementById('nether').addEventListener('change', handleTextChange);
});
