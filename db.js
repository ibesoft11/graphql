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
}, {
    freezeTableName: true
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
},{
    freezeTableName: true
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
},{
    freezeTableName: true
});
budget_vote.removeAttribute('id');
budget_vote.removeAttribute('createdAt');
budget_vote.removeAttribute('updatedAt');

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
        type: Sequelize.STRING
    }
},{
    freezeTableName: true
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
},{
        timestamps: false,
        freezeTableName: true
    }
);
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
        type: Sequelize.TINYINT
    },
    rate: {
        type: Sequelize.FLOAT
    }
},{
    timestamps: false,
    freezeTableName: true
});
pay_period.removeAttribute('id');

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
    },
    weight: {
        type: Sequelize.INTEGER
    }
},{
    freezeTableName: true
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
},{
    freezeTableName: true
});
trust_cert.removeAttribute('id');
trust_cert.removeAttribute('createdAt');
trust_cert.removeAttribute('updatedAt');

Conn.sync(()=>{
    console.log('Data models synced with MySql...');
});
//.then(() => {Conn.connectionManager.close().then(() => console.log('shut down gracefully'));}
module.exports = Conn;
