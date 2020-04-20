import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomesSum = this.transactions.reduce((total, element) => {
      if (element.type === 'income') return (total += element.value);
      return total;
    }, 0);

    const outcomesSum = this.transactions.reduce((total, element) => {
      if (element.type === 'outcome') return (total += element.value);
      return total;
    }, 0);

    const balance = {
      income: incomesSum,
      outcome: outcomesSum,
      total: incomesSum - outcomesSum,
    };

    return balance;
  }

  public isValid(value: number, type: string): boolean {
    let isValid = true;

    if (type === 'outcome' && this.getBalance().total < value) {
      isValid = false;
    }
    return isValid;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
