let emails = require('../data/emails.json');

class EmailsService {
  getAll() {
    return emails;
  }

  getById(id) {
    return emails.find(e => e.id === parseInt(id));
  }

  create(email) {
    email.id = emails.length + 1;
    emails.push(email);
    return email;
  }

  update(id, newEmail) {
    const index = emails.findIndex(e => e.id === parseInt(id));
    if (index === -1) return null;
    emails[index] = { ...emails[index], ...newEmail };
    return emails[index];
  }

  delete(id) {
    const index = emails.findIndex(e => e.id === parseInt(id));
    if (index === -1) return null;
    return emails.splice(index, 1);
  }
}

module.exports = new EmailsService();
