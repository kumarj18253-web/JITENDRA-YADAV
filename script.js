document.addEventListener('DOMContentLoaded', () => {
  const copyUpiBtn = document.getElementById('copyUpiBtn');
  const upiText = document.getElementById('upiIdText');
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');
  const sendEmailBtn = document.getElementById('sendEmailBtn');
  const clientNameInput = document.getElementById('clientName');
  const categorySelect = document.getElementById('categorySelect');
  const clientMessageInput = document.getElementById('clientMessage');

  let toastTimeout;

  // Helper for Toast
  function showToast(message) {
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }

  // Generic Clipboard Copy Helper
  async function copyToClipboard(text, successMsg) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      showToast(successMsg);
    } catch (err) {
      console.error('Failed to copy: ', err);
      showToast('Failed to copy to clipboard');
    }
  }

  // Copy UPI ID
  if (copyUpiBtn && upiText) {
    copyUpiBtn.addEventListener('click', () => {
      copyToClipboard(upiText.innerText.trim(), 'UPI ID copied to clipboard!');
    });
  }

  // Copy Full Address
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const fullAddress = 'Village Laxmipur, Post Office Naranga, Block Parihar, District Sitamarhi, PIN Code 843324';
      copyToClipboard(fullAddress, 'Address copied to clipboard!');
    });
  }

  // WhatsApp Inquiry Generator
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      const name = clientNameInput ? clientNameInput.value.trim() : '';
      const category = categorySelect ? categorySelect.value : 'Website Creation';
      const userMessage = clientMessageInput ? clientMessageInput.value.trim() : '';

      let text = `Hello, I want to inquire about website creation.`;
      if (name) text += `\n- Name: ${name}`;
      if (category) text += `\n- Category: ${category}`;
      if (userMessage) text += `\n- Project Details: ${userMessage}`;

      const phone = '918688535295';
      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/${phone}?text=${encodedText}`;

      window.open(url, '_blank');
    });
  }

  // Email Inquiry Generator
  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', () => {
      const name = clientNameInput ? clientNameInput.value.trim() : '';
      const category = categorySelect ? categorySelect.value : 'Website Creation';
      const userMessage = clientMessageInput ? clientMessageInput.value.trim() : '';

      const subject = encodeURIComponent(`Website Creation Inquiry - ${category}`);
      let body = `Hello,\n\nI am reaching out regarding website creation services.`;
      if (name) body += `\nName: ${name}`;
      body += `\nCategory: ${category}`;
      if (userMessage) body += `\nProject Details:\n${userMessage}`;

      const mailtoUrl = `mailto:yj86465@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    });
  }
});
