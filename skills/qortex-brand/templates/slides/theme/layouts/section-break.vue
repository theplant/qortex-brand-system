<template>
  <div class="slidev-layout qx-section">
    <div class="qx-section__bg" />
    <div class="qx-wordmark qx-section__mark">QORTEX</div>
    <div class="qx-section__body">
      <slot />
    </div>
  </div>
</template>

<style>
.qx-section {
  background: var(--bg2);
  color: var(--text);
  position: relative;
  overflow: hidden;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.qx-section__bg {
  position: absolute;
  inset: 0;
  background-image: url("../../assets/orb-composition.png");
  background-size: cover;
  background-position: center;
  opacity: 0.7;
  z-index: 0;
}
.qx-section__mark {
  position: relative;
  z-index: 1;
  padding: 48px 80px 0;
}
.qx-section__body {
  position: relative;
  z-index: 1;
  padding: 0 80px 80px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.qx-section .qx-section-eyebrow,
.qx-section h2 + p:first-of-type {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 22px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--cyan-bright);
  margin: 0 0 24px;
}
.qx-section h2 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 96px;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--text);
  margin: 0;
  max-width: 1500px;
}
.qx-section p {
  font-family: var(--font-body);
  font-size: 28px;
  line-height: 1.4;
  color: var(--text2);
  margin: 24px 0 0;
  max-width: 1200px;
}
[lang="ja"] .qx-section h2 {
  font-family: var(--font-jp);
  font-weight: 700;
  font-size: 84px;
  letter-spacing: 0;
  line-height: 1.4;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
</style>
