var Sequelize = require("sequelize");

const Conn = new Sequelize(
    'xataface',
  'rchain',
    'W3sh@r3',
    {
        dialect: 'mysql',
        host: 'rhobot.net'
    }
);

const admin_settings = Conn.define('admin_settings', {
    current_pay_period: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

const authorities = Conn.define('authorities', {
    login: {
        type: Sequelize.STRING,
    },
    rating: {
        type: Sequelize.BIGINT
    },
    last_cert_time: {
        type: Sequelize.DATE
    }
});

const budget_vote = Conn.define('budget_vote', {
    pay_period: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    issue_num: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    voter: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    vote_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

const dataface_failed_logins = Conn.define('dataface_failed_logins', {
    attempt_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primayKey: true
    },
    ip_address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    time_of_attempt: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const dataface_modules = Conn.define('dataface_modules', {
    module_name: {
        type: Sequelize.STRING,
        allowNull: false,
        primayKey: true
    },
    module_version: {
        type: Sequelize.INTEGER
    }
});

const dataface_mtimes = Conn.define('dataface_mtimes', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        primayKey: true
    },
    mtime: {
        type: Sequelize.INTEGER
    }
});

const dataface_version = Conn.define('dataface_version', {
    version: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const github_users = Conn.define('github_users', {
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        primayKey: true
    },
    followers: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    bio: {
        type: Sequelize.STRING
    },
    websiteUrl: {
        type: Sequelize.STRING
    },
    avatarUrl: {
        type: Sequelize.STRING
    },
    permission: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    session_token: {
        type: Sequelize.STRING
    },
    verified_coop: {
        type: Sequelize.INTEGER
    }
});

const issue = Conn.define('issue', {
    num: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        primayKey: true
    },
    labels: {
        type: Sequelize.TEXT
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    repo: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const pay_period = Conn.define('pay_period', {
    start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primayKey: true
    },
    end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    weighted: {
        type: Sequelize.INTEGER
    },
    rate: {
        type: Sequelize.FLOAT
    }
});

const reward_vote = Conn.define('reward_vote', {
    pay_period: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primayKey: true
    },
    issue_num: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primayKey: true
    },
    voter: {
        type: Sequelize.STRING,
        allowNull: false,
        primayKey: true
    },
    worker: {
        type: Sequelize.STRING,
        allowNull: false,
        primayKey: true
    },
    percent: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    vote_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    slash: {
        type: Sequelize.INTEGER
    }
});

const trust_cert = Conn.define('trust_cert', {
    subject: {
        type: Sequelize.STRING,
        allowNull: false
    },
    voter: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cert_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

Conn.sync(()=>{
    console.log('Data models synced with MySql...');
});
module.exports = Conn;