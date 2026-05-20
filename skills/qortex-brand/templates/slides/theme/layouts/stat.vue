<template>
  <div class="slidev-layout qx-stat">
    <div class="qx-wordmark qx-stat__mark">QORTEX</div>
    <div class="qx-stat__body">
      <slot />
    </div>
  </div>
</template>

<style>
.qx-stat {
  background: var(--bg);
  color: var(--text);
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.qx-stat__mark { padding: 48px 80px 0; }
.qx-stat__body {
  padding: 24px 80px 80px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.qx-stat h1 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 280px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: var(--cyan-bright);
  margin: 0;
}
.qx-stat h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 48px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 32px 0 0;
}
.qx-stat p {
  font-family: var(--font-body);
  font-size: 28px;
  line-height: 1.4;
  color: var(--text2);
  margin: 16px 0 0;
  max-width: 1100px;
}
[lang="ja"] .qx-stat h2 {
  font-family: var(--font-jp);
  font-weight: 700;
  font-size: 40px;
  letter-spacing: 0;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
</style>
