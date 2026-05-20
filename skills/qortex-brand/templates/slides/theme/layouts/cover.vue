<template>
  <div class="slidev-layout qx-cover">
    <div class="qx-cover__bg" />
    <div class="qx-wordmark qx-cover__mark">QORTEX</div>
    <div class="qx-cover__body">
      <slot />
    </div>
  </div>
</template>

<style>
.qx-cover {
  background: var(--bg);
  color: var(--text);
  position: relative;
  overflow: hidden;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.qx-cover__bg {
  position: absolute;
  inset: 0;
  background-image: url("../../assets/orb-composition.png");
  background-size: cover;
  background-position: center;
  z-index: 0;
}
.qx-cover__mark {
  position: relative;
  z-index: 1;
  padding: 48px 80px 0;
}
.qx-cover__body {
  position: relative;
  z-index: 1;
  padding: 0 80px 80px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.qx-cover h1 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 112px;
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: var(--text);
  margin: 0 0 32px;
  max-width: 1500px;
}
.qx-cover h2,
.qx-cover p {
  font-family: var(--font-body);
  font-size: 32px;
  line-height: 1.4;
  color: var(--text2);
  max-width: 1100px;
  margin: 0;
  font-weight: 400;
}
.qx-cover em {
  font-style: italic;
  color: var(--text);
}
[lang="ja"] .qx-cover h1 {
  font-family: var(--font-jp);
  font-weight: 700;
  font-size: 96px;
  letter-spacing: 0;
  line-height: 1.4;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
[lang="ja"] .qx-cover em {
  font-style: normal;
  color: var(--cyan-bright);
}
</style>
