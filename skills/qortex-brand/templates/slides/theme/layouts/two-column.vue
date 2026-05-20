<template>
  <div class="slidev-layout qx-twocol">
    <div class="qx-wordmark qx-twocol__mark">QORTEX</div>
    <div class="qx-twocol__body">
      <div class="qx-twocol__left">
        <slot name="left" />
      </div>
      <div class="qx-twocol__right">
        <slot name="right" />
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.qx-twocol {
  background: var(--bg);
  color: var(--text);
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.qx-twocol__mark { padding: 48px 80px 0; }
.qx-twocol__body {
  padding: 24px 80px 80px;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.qx-twocol h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 56px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 24px;
}
.qx-twocol p, .qx-twocol li {
  font-family: var(--font-body);
  font-size: 26px;
  line-height: 1.5;
  color: var(--text2);
}
.qx-twocol em { color: var(--cyan-bright); font-style: italic; }
[lang="ja"] .qx-twocol h2 {
  font-family: var(--font-jp);
  font-weight: 700;
  font-size: 48px;
  letter-spacing: 0;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
[lang="ja"] .qx-twocol em { font-style: normal; }
</style>
