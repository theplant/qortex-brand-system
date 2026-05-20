<template>
  <div class="slidev-layout qx-quote">
    <div class="qx-wordmark qx-quote__mark">QORTEX</div>
    <div class="qx-quote__body">
      <slot />
    </div>
  </div>
</template>

<style>
.qx-quote {
  background: var(--bg);
  color: var(--text);
  padding: 0;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.qx-quote::before {
  content: "";
  position: absolute;
  right: -200px;
  bottom: -260px;
  width: 900px;
  height: 900px;
  border-radius: 50%;
  background: radial-gradient(circle at center, var(--cyan-bright) 0%, var(--cyan) 40%, transparent 70%);
  filter: blur(180px);
  opacity: 0.7;
  z-index: 0;
}
.qx-quote__mark {
  position: relative;
  z-index: 1;
  padding: 48px 80px 0;
}
.qx-quote__body {
  position: relative;
  z-index: 1;
  padding: 24px 80px 80px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.qx-quote blockquote {
  border: none;
  margin: 0;
  padding: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 64px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text);
  max-width: 1500px;
}
.qx-quote em { font-style: italic; }
.qx-quote p + p,
.qx-quote .author {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 26px;
  color: var(--text3);
  margin-top: 40px;
  max-width: 1200px;
}
[lang="ja"] .qx-quote blockquote {
  font-family: var(--font-jp);
  font-weight: 700;
  font-size: 56px;
  letter-spacing: 0;
  line-height: 1.6;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
[lang="ja"] .qx-quote em { font-style: normal; color: var(--cyan-bright); }
</style>
