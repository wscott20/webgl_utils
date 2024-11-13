//requires gl-matrix module, you can add it in html file with <script src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.4.0/gl-matrix.js"></script>
function compileShader(gl,src,type) {
    let shader = gl.createShader(type)
    gl.shaderSource(shader,src)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
        throw Error(gl.getShaderInfoLog(shader))
    return shader
}
function shaderProgram(gl,vs,fs) {
    let program = gl.createProgram()
    gl.attachShader(program,vs)
    gl.attachShader(program,fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program,gl.LINK_STATUS))
        throw Error(gl.getProgramInfoLog(program))
    gl.useProgram(program)
    return program
}

function vertexBuffer(gl,vertices) {
    let buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    return buffer
}
function indexBuffer(gl,indices) {
    let buffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
    return buffer
}
function vertexAttrib(gl,sp,attribName,stride,offset,size) {
    let loc = gl.getAttribLocation(sp,attribName)
    gl.vertexAttribPointer(loc,size,gl.FLOAT,false,stride * Float32Array.BYTES_PER_ELEMENT,offset * Float32Array.BYTES_PER_ELEMENT)
    gl.enableVertexAttribArray(loc)
    return loc
}
function doMatrices(canvas,gl,sp,objMatName,projMatName) {
    let objMatLoc = gl.getUniformLocation(sp,objMatName)
    let projMatLoc = gl.getUniformLocation(sp,projMatName)
    let projMat = mat4.create()
    mat4.perspective(projMat,Math.PI / 4,canvas.width / canvas.height, 0.1, 100.0)
    let objMat = mat4.create()
    gl.uniformMatrix4fv(objMatLoc, false, objMat)
    gl.uniformMatrix4fv(projMatLoc, false, projMat)
    return {objMat,projMat,objMatLoc,projMatLoc}
}
function updateMatrix(gl,matLoc,mat) {
    gl.uniformMatrix4fv(matLoc,false,mat)
}
function draw(gl,indexCount,offset) {
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
    gl.drawElements(gl.TRIANGLES,indexCount,gl.UNSIGNED_SHORT,offset)
}
