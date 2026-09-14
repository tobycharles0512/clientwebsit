function fillHtml(value, placeholder) {
  if (value) return `<span class="fill">${value}</span>`;
  return `<span class="fill empty">[${placeholder}]</span>`;
}

function contractHtml(f) {
  return `
    <h2 style="margin-top:0;">Website Sale &amp; Transfer Agreement</h2>
    <p><strong>This agreement is made between:</strong></p>
    <p><strong>The Seller:</strong> ${fillHtml(f.sellerName, 'Your full name')} trading as Charles Digital, of ${fillHtml(f.sellerAddress, 'your address / business address')} ("the Seller")</p>
    <p><strong>and</strong></p>
    <p><strong>The Buyer:</strong> ${fillHtml(f.buyerName, 'Client full name / company name')}, of ${fillHtml(f.buyerAddress, 'client address')} ("the Buyer")</p>
    <p><strong>Date of agreement:</strong> ${fillHtml(f.date, 'DD/MM/YYYY')}</p>

    <h2>1. What is being sold</h2>
    <p>The Seller agrees to transfer to the Buyer full ownership of the website/application known as ${fillHtml(f.projectName, 'Project name')}, currently viewable at ${fillHtml(f.previewUrl, 'current URL/preview link')}, comprising:</p>
    <ul>
      <li>The complete source code for the project, delivered by the Seller into a GitHub repository created by the Buyer, as part of the handover process (Section 4).</li>
      <li>The website's hosting, connected or transferred by the Seller into a Vercel project created by the Buyer, as part of the handover process (Section 4).</li>
      <li>Any design assets, content, and documentation created by the Seller specifically for this project.</li>
    </ul>
    <p>This sale covers the version of the site demonstrated to the Buyer on ${fillHtml(f.demoDate, 'demo date')}, at the functionality shown at that time. It does not include work not yet completed, or features discussed but not built, except: ${fillHtml(f.delivered, 'None — delivered in full as demonstrated.')}</p>

    <h2>2. What is NOT included</h2>
    <ul>
      <li>The Seller's business name, "Charles Digital", and any Charles Digital branding, logo, or trademark.</li>
      <li>Any of the Seller's personal or business accounts with third-party services, except where explicitly transferred as part of this agreement.</li>
      <li>Stock photography, fonts, icons, or third-party assets used under a license that does not permit transfer.</li>
      <li>Any ongoing maintenance, updates, bug fixes, or new feature development, except as set out in Section 6.</li>
    </ul>

    <h2>3. Price and payment</h2>
    <ul>
      <li><strong>Total price:</strong> £${fillHtml(f.totalPrice, 'amount')}</li>
      <li><strong>Deposit:</strong> £${fillHtml(f.depositAmount, 'amount')} (${fillHtml(f.depositPercent, '15%')}), due on signing this agreement, before any transfer work begins.</li>
      <li><strong>Balance:</strong> due ${fillHtml(f.balanceTerms, 'on completion of handover / within X days of handover / other — specify')}.</li>
      <li><strong>Payment method(s) accepted:</strong> ${fillHtml(f.paymentMethod, 'bank transfer')}</li>
      <li>If the balance is not paid within ${fillHtml(f.lateDays, 'X')} days of the agreed due date, the Seller reserves the right to revoke the Buyer's access to the transferred repository and hosting project and treat this agreement as terminated, without refunding the deposit.</li>
      <li>All transfer steps (Section 4) begin only once the deposit has been paid and has cleared.</li>
    </ul>

    <h2>4. The transfer process</h2>
    <ul>
      <li>The Buyer will create their own GitHub account and repository, create their own Vercel account, and (if applicable) purchase their own domain, following the accompanying step-by-step guide.</li>
      <li>Once the deposit has cleared and the Buyer has completed their account and repository setup, the Seller will push the complete source code into the Buyer's own GitHub repository, and connect or transfer the Vercel hosting project into the Buyer's own account.</li>
      <li>Where no domain is included in this sale, the Buyer will register a new domain directly in their own name and account, and the Seller has no ownership interest in it.</li>
      <li>Both parties agree to test the live site together (or the Buyer will confirm testing independently) before the balance is released and before the Seller removes their own access.</li>
    </ul>

    <h2>5. After handover</h2>
    <p>Once the balance is paid in full and the transfer is confirmed working, the Seller will remove their own access to the Buyer's GitHub repository and Vercel project. From that point, the Buyer is solely responsible for the code, hosting, domain, and any accounts running the site, including all ongoing costs. The Seller has no further access to, or responsibility for, the site after this point, except as set out in Section 6.</p>

    <h2>6. Support after handover</h2>
    <p>${f.support || '<span class="fill empty">[support option not yet chosen]</span>'}</p>

    <h2>7. Warranty and liability</h2>
    <p>The website/application is sold "as is". The Seller warrants that, to the best of their knowledge, it functions as demonstrated to the Buyer as of the handover date, and that they have the right to transfer it. The Seller does not warrant that the site will continue to function indefinitely, particularly where its operation depends on third-party services whose pricing, features, or availability may change after handover and are outside the Seller's control. The Seller's total liability under this agreement, however arising, is limited to the total price paid under Section 3. The Seller is not liable for any indirect or consequential loss arising after handover. Nothing in this agreement limits liability for fraud, or for death or personal injury caused by negligence, where such limitation is not permitted by law.</p>

    <h2>8. Intellectual property</h2>
    <p>Full ownership of the code and content specific to this project transfers to the Buyer upon receipt of the full price under Section 3. The Seller retains the right to reuse general-purpose code, components, and techniques (not specific to the Buyer's business, content, or branding) in future projects for other clients.</p>

    <h2>9. Confidentiality</h2>
    <p>Both parties agree to keep the commercial terms of this agreement, and any credentials or access shared during the handover process, confidential, except where disclosure is required by law.</p>

    <h2>10. Governing law</h2>
    <p>This agreement is governed by the laws of ${fillHtml(f.jurisdiction, 'England and Wales / your jurisdiction')}, and both parties submit to the exclusive jurisdiction of its courts.</p>

    <h2>11. Entire agreement</h2>
    <p>This document, together with the accompanying handover guide referenced within it, represents the entire agreement between the parties regarding this sale, superseding any prior discussions or quotes, whether written or verbal.</p>
  `;
}

function contractPlainText(f) {
  const p = (v, ph) => v || `[${ph}]`;
  const lines = [];
  lines.push('WEBSITE SALE & TRANSFER AGREEMENT', '');
  lines.push('This agreement is made between:', '');
  lines.push(`The Seller: ${p(f.sellerName,'Your full name')} trading as Charles Digital, of ${p(f.sellerAddress,'your address / business address')} ("the Seller")`, '');
  lines.push('and', '');
  lines.push(`The Buyer: ${p(f.buyerName,'Client full name / company name')}, of ${p(f.buyerAddress,'client address')} ("the Buyer")`, '');
  lines.push(`Date of agreement: ${p(f.date,'DD/MM/YYYY')}`, '');

  lines.push('1. WHAT IS BEING SOLD');
  lines.push(`The Seller agrees to transfer to the Buyer full ownership of the website/application known as ${p(f.projectName,'Project name')}, currently viewable at ${p(f.previewUrl,'current URL/preview link')}, comprising:`);
  lines.push('- The complete source code for the project, delivered into a GitHub repository created by the Buyer.');
  lines.push('- The website\'s hosting, connected or transferred into a Vercel project created by the Buyer.');
  lines.push('- Any design assets, content, and documentation created by the Seller specifically for this project.');
  lines.push(`This sale covers the version of the site demonstrated to the Buyer on ${p(f.demoDate,'demo date')}. It does not include work not yet completed, except: ${p(f.delivered,'None — delivered in full as demonstrated.')}`, '');

  lines.push('2. WHAT IS NOT INCLUDED');
  lines.push('- The Seller\'s business name, "Charles Digital", and any Charles Digital branding, logo, or trademark.');
  lines.push('- The Seller\'s personal/business accounts with third-party services, except where explicitly transferred.');
  lines.push('- Stock photography, fonts, icons, or third-party assets used under a non-transferable license.');
  lines.push('- Any ongoing maintenance, updates, bug fixes, or new feature development, except as set out in Section 6.', '');

  lines.push('3. PRICE AND PAYMENT');
  lines.push(`Total price: £${p(f.totalPrice,'amount')}`);
  lines.push(`Deposit: £${p(f.depositAmount,'amount')} (${p(f.depositPercent,'15%')}), due on signing, before any transfer work begins.`);
  lines.push(`Balance: due ${p(f.balanceTerms,'on completion of handover / within X days / other')}.`);
  lines.push(`Payment method(s): ${p(f.paymentMethod,'bank transfer')}`);
  lines.push(`If the balance is not paid within ${p(f.lateDays,'X')} days of the due date, the Seller may revoke access and treat this agreement as terminated, without refunding the deposit.`, '');

  lines.push('4. THE TRANSFER PROCESS');
  lines.push('The Buyer creates their own GitHub account/repository, Vercel account, and domain (if applicable). Once the deposit clears and setup is complete, the Seller pushes the code and hosting into the Buyer\'s own accounts. Both parties test the live site together before the balance is released and access is removed.', '');

  lines.push('5. AFTER HANDOVER');
  lines.push('Once the balance is paid and transfer confirmed working, the Seller removes their own access. The Buyer is solely responsible for the code, hosting, domain, and any accounts running the site from that point on.', '');

  lines.push('6. SUPPORT AFTER HANDOVER');
  lines.push(f.support || '[support option not yet chosen]', '');

  lines.push('7. WARRANTY AND LIABILITY');
  lines.push('Sold "as is". The Seller\'s total liability is limited to the total price paid under Section 3, and excludes indirect or consequential loss. Nothing limits liability for fraud, or death/personal injury caused by negligence.', '');

  lines.push('8. INTELLECTUAL PROPERTY');
  lines.push('Full ownership of the project-specific code and content transfers to the Buyer upon full payment. The Seller retains the right to reuse general-purpose, non-client-specific code and techniques in future projects.', '');

  lines.push('9. CONFIDENTIALITY');
  lines.push('Both parties keep the commercial terms and any credentials/access shared during handover confidential, except where disclosure is required by law.', '');

  lines.push('10. GOVERNING LAW');
  lines.push(`This agreement is governed by the laws of ${p(f.jurisdiction,'England and Wales / your jurisdiction')}.`, '');

  lines.push('11. ENTIRE AGREEMENT');
  lines.push('This document, with the accompanying handover guide, represents the entire agreement, superseding prior discussions or quotes.', '');

  return lines.join('\n');
}

const SUPPORT_OPTIONS = [
  { value: 'free7', text: 'Up to 7 days of free email support after handover, covering questions about how the site works — not new features.' },
  { value: 'paid', text: 'Paid ongoing support available by separate arrangement, with no obligation on either side.' },
  { value: 'freebugs', text: 'Any bugs or necessary fixes are free of charge for the first week after handover.' }
];
