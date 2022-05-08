const puppeteer = require("puppeteer");
require("dotenv").config();

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // 1. Criar form para receber locais do Usuário
  // 2. Ao clicar em Submit enviar o Local de Destino para um .env(para ser utilizado na pesquisa))
  // 3. Acessar .env com dados de entrada do usuário e realizar um POST na Barra de Pesquisa
  const userDestiny = `
    <form>
    <!-- Event funciona, mas o valor só aparece despois do campo perder o foco -->
      <input onchange={console.log(document.getElementById('destino').value)} id="destino" type="text" placeholder="Local de Destino" />

      <input type="hidden" _next="https://www.google.com.br/maps/${process.env.COORDENADAS}" />

      <!-- Mostrar no console o valor do campo 'destino', que recebe a entrada do usuário -->
      <button onclick={console.log(document.getElementById("destino").value)} type="submit">Avançar<button/>
      <button type="reset">Limpar<button/>

      <!-- 
        Não funciona
        <button onclick={ page.screenshot({ path: 'example.png' }) } type="submit">Avançar<button/>
       -->
    </form>
  `;

  await page.goto(
    `https://www.google.com.br/maps/${process.env.COORDENADAS}`
  );

  page.setContent(userDestiny);
  page.on("console", (msg) => console.log("PAGE LOG: ", msg.text()));


  // await page.evaluate(() => {
  //   console.log(`URL utilizada é:  ${location.href}`);
  // });

  //   await browser.close();
})();
