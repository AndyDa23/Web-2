let emails = require('../data/emails.json');

class EmailsService {
  getAll() {
    return emails;
  }

  getById(id) {
    return emails.find(e => e.id === Number(id));
  }

  create({ address, verified, userId }) {
    const newEmail = {
      id: emails.length + 1,
      address,
      verified: verified || false,
      userId
    };
    emails.push(newEmail);
    return newEmail;
  }

  update(id, newEmail) {
    const index = emails.findIndex(e => e.id === Number(id));
    if (index === -1) return null;
    emails[index] = { ...emails[index], ...newEmail };
    return emails[index];
  }

  delete(id) {
    const index = emails.findIndex(e => e.id === Number(id));
    if (index === -1) return null;
    return emails.splice(index, 1)[0];
  }
}

module.exports = new EmailsService();
