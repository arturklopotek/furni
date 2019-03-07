THREE.Shape.prototype.lineH = function(distance) {
    this.lineTo(this.currentPoint.x + distance, this.currentPoint.y);
};
THREE.Shape.prototype.lineV = function(distance) {
    this.lineTo(this.currentPoint.x, this.currentPoint.y + distance);
};
THREE.Shape.prototype.line = function(distanceX, distanceY) {
    this.lineTo(this.currentPoint.x + distanceX, this.currentPoint.y + distanceY);
};

function createElementA(a, b, c, d=30) {

    const outerShape = new THREE.Shape();

    {
        outerShape.moveTo(-a/2, b/2); // A
        outerShape.lineH(1.5*d); // A-B
        outerShape.lineV(-0.25*b) // B-C
        outerShape.lineH(d); // C-D
        outerShape.lineV(+0.25*b); // D-E
        outerShape.lineH(+a-5*d); // E-E'

        outerShape.lineV(-0.25*b) // E'-D'
        outerShape.lineH(d); // D'-C'
        outerShape.lineV(+0.25*b); // C'-B'
        outerShape.lineH(1.5*d); // B'-A'

        outerShape.lineV(-b); // B'-A'

        outerShape.lineH(-1.5*d); // A-B
        outerShape.lineV(0.25*b) // B-C
        outerShape.lineH(-d); // C-D
        outerShape.lineV(-0.25*b); // D-E
        outerShape.lineH(-(a-5*d)); // E-E'

        outerShape.lineV(0.25*b) // E'-D'
        outerShape.lineH(-d); // D'-C'
        outerShape.lineV(-0.25*b); // C'-B'
        outerShape.lineH(-1.5*d); // B'-A'
    }
    
    const innerShape = new THREE.Shape();
    {
        innerShape.moveTo(-0.25*a, 0.5*d);
        innerShape.lineV(-d);
        innerShape.lineH(0.5 * a);
        innerShape.lineV(d);
    }
    outerShape.holes.push(innerShape);

    return new THREE.ExtrudeGeometry(outerShape, { amount: d, bevelEnabled: false });
}

function createElementB(a, b, c, d) {

    const outerShape = new THREE.Shape();

    {
        outerShape.moveTo(0, b/2); // A
        outerShape.lineH(c); // A-B
        outerShape.lineV(-d) // B-C
        outerShape.line(-(c-4*d), -(0.25*b-d)); // C-D
        outerShape.lineV(-0.5*b); // D-E

        outerShape.line(c-4*d, -(0.25*b-d)); // E-F
        outerShape.lineV(-d) // F-G
        outerShape.lineH(-c); // G-H
        outerShape.lineV(b/4); // H-I
        outerShape.lineH(d); // I-J
        outerShape.lineV(+(0.25*b-0.5*d)); // J-K
        outerShape.lineH(1.5*d); // K-L
        outerShape.lineV(d); // L-M
        outerShape.lineH(-1.5*d); // M-N
        outerShape.lineV(+(0.25*b-0.5*d)); // N-O
        outerShape.lineH(-d); // O-P
    }

    const geometry = new THREE.ExtrudeGeometry(outerShape, { amount: d, bevelEnabled: false });
    geometry.translate(-d, 0, -d/2);
    return geometry;
}

function createElementC(a, b, c, d) {

    const outerShape = new THREE.Shape();

    {
        outerShape.moveTo(-a/2, 0); // A
        outerShape.lineH(0.25*a); // A-B
        outerShape.lineV(d); // B-C
        outerShape.lineH(1.5*d); // C-D
        outerShape.lineV(-2.5*d); // D-E
        outerShape.lineH(0.5*a-3*d); // E-F
        outerShape.lineV(2.5*d); // F-G
        outerShape.lineH(1.5*d); // G-H
        outerShape.lineV(-d); // H-I
        outerShape.lineH(0.25*a); // I-J
        outerShape.lineV(-3*d); // J-K
        outerShape.lineH(-1.5*d); // K-L
        outerShape.lineV(+1.5*d); // L-M
        outerShape.lineH(-d); // M-N
        outerShape.lineV(-1.5*d); // N-O
        outerShape.lineH(-(a-5*d)); // O-P
        outerShape.lineV(1.5*d); // P-Q
        outerShape.lineH(-d); // Q-R
        outerShape.lineV(-1.5*d); // R-S
        outerShape.lineH(-1.5*d); // S-T
    }

    const geometry = new THREE.ExtrudeGeometry(outerShape, { amount: d, bevelEnabled: false });
    geometry.translate(0, 0, -d/2);
    return geometry;
}

var elements = {
    A: createElementA,
    B: createElementB,
    C: createElementC
}
