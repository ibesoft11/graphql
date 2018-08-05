var Sequelize = require("sequelize");
var config = require("./config");

const Conn = new Sequelize(
    'xataface',
    config.user,
    config.password,
    {
        dialect: 'mysql',
        host: 'rhobot.net',
    }
);

const admin_settings = Conn.define('admin_settings', {
    current_pay_period: {
        type: Sequelize.DATE,
        allowNull: false
    }
});
admin_settings.removeAttribute('createdAt');
admin_settings.removeAttribute('updatedAt');

const authorities = Conn.define('authorities', {
    login: {
        type: Sequelize.STRING,
    },
    rating: {
        type: Sequelize.TINYINT
    },
    last_cert_time: {
        type: Sequelize.DATE
    }
});
authorities.removeAttribute('id');
authorities.removeAttribute('createdAt');
authorities.removeAttribute('updatedAt');


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
    },
    weight: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
budget_vote.removeAttribute('id');
budget_vote.removeAttribute('createdAt');
budget_vote.removeAttribute('updatedAt');

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
dataface_failed_logins.removeAttribute('id');
dataface_failed_logins.removeAttribute('createdAt');
dataface_failed_logins.removeAttribute('updatedAt');

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
dataface_modules.removeAttribute('id');
dataface_modules.removeAttribute('createdAt');
dataface_modules.removeAttribute('updatedAt');

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
dataface_mtimes.removeAttribute('id');
dataface_mtimes.removeAttribute('createdAt');
dataface_mtimes.removeAttribute('updatedAt');

const dataface_version = Conn.define('dataface_version', {
    version: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
dataface_version.removeAttribute('id');
dataface_version.removeAttribute('createdAt');
dataface_version.removeAttribute('updatedAt');

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
    session_token: {
        type: Sequelize.STRING
    },
    verified_coop: {
        type: Sequelize.INTEGER
    }
});
github_users.removeAttribute('id');
github_users.removeAttribute('updatedAt');

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
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    repo: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
issue.removeAttribute('id');

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
pay_period.removeAttribute('id');
pay_period.removeAttribute('createdAt');
pay_period.removeAttribute('updatedAt');

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
reward_vote.removeAttribute('id');
reward_vote.removeAttribute('createdAt');
reward_vote.removeAttribute('updatedAt');

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
        type: Sequelize.TINYINT,
        allowNull: false
    },
    cert_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});
trust_cert.removeAttribute('id');
trust_cert.removeAttribute('createdAt');
trust_cert.removeAttribute('updatedAt');

Conn.sync(()=>{
    console.log('Data models synced with MySql...');
});
//.then(() => {Conn.connectionManager.close().then(() => console.log('shut down gracefully'));}
module.exports = Conn;
