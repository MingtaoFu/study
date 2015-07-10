function setupBuffers() {
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var lineVertices = [
        -0.8, -0.2,  0.0,
        -0.8, -0.5,  0.0,
        -0.8, -0.5,  0.0,
        -0.7, -0.5,  0.0,
        -0.6, -0.5,  0.0,
        -0.5, -0.5,  0.0,
        -0.5, -0.5,  0.0,
        -0.5, -0.4,  0.0,
        -0.5, -0.4,  0.0,
        -0.6, -0.4,  0.0,
        -0.6, -0.4,  0.0,
        -0.6, -0.5,  0.0,
         
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineVertices), gl.STATIC_DRAW);
    vertexBuffer.itemSize = 3;
    vertexBuffer.numberOfItems = 12;
}

function draw() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexBuffer.itemSize, 
                            gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.drawArrays(gl.LINES, 0, vertexBuffer.numberOfItems);
}

function startup() {
    canvas = document.getElementById('canvas');
    gl = WebGLDebugUtils.makeDebugContext(createGLContext(canvas));
    setupShaders();
    setupBuffers();
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    draw();
}
