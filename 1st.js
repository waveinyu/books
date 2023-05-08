import invoices from "./invoices.json" assert { type: "json" };
import plays from "./play.json" assert { type: "json" };

function statement(invoices, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역(고객명: ${invoices.customer})\n`;

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoices.performance) {
    const play = plays[pref.palyID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (pref.audience > 30) {
          thisAmount += 1000 * (pref.audience - 30);
        }
        break;

      case "comedy":
        thisAmount = 30000;
        if (pref.audience > 20) {
          thisAmount += 10000 + 500 * (pref.audience - 20);
        }
        thisAmount += 300 * pref.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르 : ${play.type}`);
    }

    // 포인트 적립
    volumeCredits += Math.max(perf.audience - 30, 0);

    // 희극 관객 5명마다 추가 포인트 제공
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역 출력
    result += `${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액 : ${format(totalAmount / 100)}\n`;
  result += `적립 포인트 : ${volumeCredits}점\n`;

  return result;
}

console.log(statement(invoices, plays));
