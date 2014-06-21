/**
Analog Clock - An SGX Example App

Copyright 2011-2014 by Steven Goodwin. All Rights Reserved.

This file is released under the GNU GPL, version 2.0

Please see the licensing conditions for details.

http://www.sgxengine.com

*/

var clockFaceTexture;

function SGXPrepare_OS() {
	sgxskeleton.PrepareLoadingPage();

	new sgx.main.System();

	sgx.graphics.Engine.create(200,200);	// the size of the draw area we (as programmers) will use

	sgx.main.System.writePage();
	sgx.main.System.initialize();	// optionally pass the 'loading_screen' ID here, to hide the contents once loaded
}

function SGXinit() {

	clockFaceTexture = sgx.graphics.TextureManager.get().load("clockface");
}

function SGXstart() {
}


function SGXupdate(telaps) {
}

function drawClockHand(handIndex, fractionalPosition, offsetX, offsetY) {
	var pSurface = sgx.graphics.DrawSurfaceManager.get().getDisplaySurface();
	
	// fractionalPosition is between 0 and 1. Working clockwise from the top of the face
	// theta is an angle
	theta = SGX_2PI - (SGX_2PI * fractionalPosition);
	
	m_Xform = new sgx.Matrix43f();
	m_Xform.setRotateZ(theta);
	m_Xform.pos.x = 100;
	m_Xform.pos.y = 100;
	
	pSurface.setFillTexture(clockFaceTexture, handIndex);
	pSurface.setRenderTransform(m_Xform);
	pSurface.fillPoint(offsetX, offsetY);
}


function SGXdraw() {
	var pSurface = sgx.graphics.DrawSurfaceManager.get().getDisplaySurface();
	var currentTime = new Date()

	pSurface.setRenderTransform(null);
	pSurface.setFillTexture(clockFaceTexture);
	pSurface.fillPoint(100,100);
	
	// Clock hands move gradually between the hours/minutes, not just on them, so we
	// incorporate the minutes/seconds count.
	drawClockHand(2,( (currentTime.getMinutes() + currentTime.getSeconds() / 60)) / 60, 1, -45);
	drawClockHand(1, ((currentTime.getHours() + (currentTime.getMinutes() / 60)) / 12), 0, -46);
	drawClockHand(3, currentTime.getSeconds() / 60, 0, -45);

	sgx.graphics.Engine.get().draw();
}
