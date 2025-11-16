// /home/kf/mcmap/main.js
// define a change handler that reads the value of a text input


function overtonether() {

    let newover = document.getElementById('omap').contentWindow.location.href;
    oldover = newover;
    coords = newover.split(':');
    zoom = coords[5];
    document.getElementById('overworld').value = `${coords[2]} ${coords[3]} ${coords[4]}`;
    handleTextChange({ target: { id: 'overworld', value: document.getElementById('overworld').value } });



}


function nethertoover() {
    let newnether = document.getElementById('nmap').contentWindow.location.href;
    oldnether = newnether;
    coords = newnether.split(':');
    zoom = coords[5];
    document.getElementById('nether').value = `${coords[2]} ${coords[3]} ${coords[4]}`;
    handleTextChange({ target: { id: 'nether', value: document.getElementById('nether').value } });

}


var zoom = 200;






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


        document.getElementById('omap').src = `https://maps.schnism.net/#overworld:${ox}:${oy}:${oz}:${zoom}:0:0:0:1:flat`;
        document.getElementById('nmap').src = `https://maps.schnism.net/#nether:${nx}:${ny}:${nz}:${zoom}:0:0:0:1:flat`

        console.log(`Overworld: x=${ox} y=${oy} z=${oz}`);
        console.log(`Nether: x=${nx} y=${ny} z=${nz}`);
        console.log(document.getElementById('omap').src);




    } catch (e) {
        console.error('Error parsing coordinates:', e);
    }




    //document.getElementById('overworldt').textContent = `x=${value} y=64 z=${value}`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('overworld').addEventListener('change', handleTextChange);
    document.getElementById('nether').addEventListener('change', handleTextChange);
});
