function createElementA(position, offset, size) {
    var arcShape = new THREE.Shape();

    {
        let h = size * 48;
        arcShape.moveTo( 0,0 );
        arcShape.lineTo(0, h);
        arcShape.lineTo(40, h);
        arcShape.lineTo(40, h + 12);
        arcShape.lineTo(80, h + 12);
        arcShape.lineTo(80, h);
        arcShape.lineTo(120, h);
        arcShape.lineTo(120, 0);
        arcShape.lineTo(80, 0);
        arcShape.lineTo(80, 12);
        arcShape.lineTo(40, 12);
        arcShape.lineTo(40, 0);
        console.info(arcShape);
    }
    
    for (let i=0;i<size; i++) {
        let holePath = new THREE.Shape(),
            level = i * 48;
        holePath.moveTo(40, 12 + 15 + level);
        holePath.lineTo(80, 12 + 15 + level);
        holePath.lineTo(80, 12 + 15 + 6 + level);
        holePath.lineTo(40, 12 + 15 + 6 + level);
        arcShape.holes.push( holePath );

    }

    //var extrudeSettings = { amount: 6, bevelEnabled: true, bevelSegments: 2, steps: 12, curveSegments: 32, bevelSize: 0.5, bevelThickness: 1.5 };
    var extrudeSettings = { amount: 6, bevelEnabled: false };    
    
    var geometry = new THREE.ExtrudeGeometry( arcShape, extrudeSettings );
    var mesh = new THREE.Mesh(
        geometry, elements.material
        //new THREE.BufferSubdivisionModifier(1).modify(geometry), 
        //new THREE.MeshLambertMaterial( { color: 0x804000, flatShading: THREE.SmoothShading } )
    );
    mesh.geometry.translate(0, 0, position * 48 + offset * 6);
    for (let i=0;i<mesh.geometry.faceVertexUvs[0].length;i++) {
        for (let v=0;v<3;v++) {
            mesh.geometry.faceVertexUvs[0][i][v].x /= 1000;
            mesh.geometry.faceVertexUvs[0][i][v].y /= 1000;
        }
    }
    mesh.castShadow = true;
    return mesh;
}

function createElementB(position, size) {
    var arcShape = new THREE.Shape();

    {
        let h = size * 48;
        arcShape.moveTo(0, 0);
        arcShape.lineTo(0, h);
        arcShape.lineTo(40, h);
        arcShape.lineTo(40, h + 12);
        arcShape.lineTo(80, h + 12);
        arcShape.lineTo(80, h);
        arcShape.lineTo(120, h);
        arcShape.lineTo(120, 0);
        arcShape.lineTo(80, 0);
        arcShape.lineTo(80, -12);
        arcShape.lineTo(40, -12);
        arcShape.lineTo(40, 0);
    }
    
    //var extrudeSettings = { amount: 6, bevelEnabled: true, bevelSegments: 2, steps: 12, curveSegments: 32, bevelSize: 0.5, bevelThickness: 1.5 };
    var extrudeSettings = { amount: 6, bevelEnabled: false };    

    var geometry = new THREE.ExtrudeGeometry( arcShape, extrudeSettings );
    var mesh = new THREE.Mesh(
        geometry, elements.material        
        //new THREE.BufferSubdivisionModifier(1).modify(geometry), 
        //new THREE.MeshLambertMaterial( { color: 0x605000, flatShading: THREE.SmoothShading } )
    );
    mesh.geometry.rotateX(Math.PI / 2);
    mesh.geometry.translate(0, 32 + position * 48, 12 - 6);
    return mesh;
}

var elements = {
    A: createElementA,
    B: createElementB
}