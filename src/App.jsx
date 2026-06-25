import { useEffect, useRef, useState } from 'react'
import './App.css'

const problems  = [
  {
    title: '問い合わせ対応に追われている',
    text: (
      <>
        電話、メール、フォームの対応が担当者に集中し、記録や引き継ぎが後回しになっている。
      </>
    ),
  },
  {
    title: '記録作成に時間がかかる',
    text: (
      <>
        報告書、議事録、作業記録などの作成に時間を取られ、本来の業務に集中できない。
      </>
    ),
  },
  {
    title: '必要な情報が見つからない',
    text: (
      <>
        マニュアル、過去資料、問い合わせ履歴が散らばり、確認や判断に時間がかかっている。
      </>
    ),
  },
  {
    title: '定型作業が手作業のまま',
    text: (
      <>
        申請、確認、通知、台帳更新など、繰り返し発生する作業が人の手に依存している。
      </>
    ),
  },
]

const services = [
  {
    label: '01',
    title: 'AI Agent 導入支援',
    text: 'AI電話受付、Webチャット窓口、業務案内、通話・問い合わせ記録の整理などを支援します。',
  },
  {
    label: '02',
    title: '業務システム開発',
    text: '販売管理、在庫管理、申請受付、社内管理画面など、業務に合わせたWebシステムを設計・開発します。',
  },
  {
    label: '03',
    title: 'DX化・業務改善',
    text: '紙、Excel、口頭確認、属人化された作業を整理し、システム化しやすい業務フローへ整えます。',
  },
]

const works = [
  '業務管理システム',
  '在庫・棚卸管理システム',
  '申請受付管理システム',
  'AI電話受付デモ',
]

const industries = [
  '中小企業',
  '自治体・窓口業務',
  '介護施設',
  '建設・現場管理',
  '運送・物流',
  '販売・飲食',
  '業務自動化・DX'
]

function App() {
  const [route, setRoute] = useState(() => window.location.hash || '#home')

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#home')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (route === '#chat') {
    return <ChatPage />
  }

  return (
    <div className="page">
      <a className="chat-entry" href="#chat">AI Chat</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home">
            <div className="brand-symbol">正</div>
            <div>
              <div className="brand-name">正創株式会社</div>
              <div className="brand-tagline">System Development / DX / AI Agent</div>
            </div>
          </a>

          <nav className="nav">
            <a href="#home">首页</a>
            <a href="#problems">課題</a>
            <a href="#services">サービス</a>
            <a href="#works">実績</a>
            <a href="#company">会社紹介</a>
            <a href="#contact">お問い合わせ</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-shade" />

          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">IT SYSTEM / DX / AI AGENT</p>

              <h1>
                AI Agent 時代へ
                <span>業務を もっとスマートに</span>
              </h1>

              <p className="hero-lead">
                AI Agentは、人のように理解し、判断し、対話するアシスタントです。<br />
                確認・記録・問い合わせ対応の負担を減らし、実務で使える仕組みを構築します。
              </p>

              <div className="hero-actions">
                <a className="btn primary" href="#services">サービスを見る</a>
                <a className="btn secondary" href="#chat">AIと相談</a>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-inner">
            <p>対応領域</p>
            {industries.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section id="problems" className="section problems-section">
          <div className="container">
            <div className="section-head">
              <p className="section-en">BUSINESS ISSUES</p>
              <h2>AIが対応できる業務課題</h2>
              <p>
                問い合わせ、記録作成、情報確認、定型作業。
                日々の業務に残る小さな負担が、現場の時間と判断力を圧迫しています。
              </p>
            </div>

            <div className="problem-grid">
              {problems.map((item, index) => (
                <article className="problem-card" key={item.title}>
                  <div className="problem-card-body">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="container">
            <div className="section-head row">
              <div>
                <p className="section-en">SERVICES</p>
                <h2>サービス</h2>
              </div>
              <p>
                小さく始めて、実際に使える形へ。業務整理から開発、AI活用、クラウド構築まで一貫して支援します。
              </p>
            </div>

            <div className="service-grid">
              {services.map((item) => (
                <article className="service-card" key={item.title}>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a href="#chat">AIと相談 ›</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="works" className="section works-section">
          <div className="container works-grid">
            <div>
              <p className="section-en">WORKS</p>
              <h2>実績・開発例</h2>
              <p className="section-text">
                実際の業務に合わせた管理画面、申請受付、在庫・棚卸、AI電話受付など、
                業務の流れを見える化するシステム開発を行っています。
              </p>

              <div className="work-list">
                {works.map((item, index) => (
                  <div className="work-item" key={item}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="system-preview">
              <div className="preview-window">
                <div className="preview-header">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="preview-body">
                  <div className="preview-menu" />
                  <div className="preview-content">
                    <div className="preview-title" />
                    <div className="preview-table">
                      {Array.from({ length: 20 }).map((_, index) => (
                        <span key={index} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p>※ システム画面・実績画像は後ほど差し替え可能です。</p>
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="container">
            <div className="section-head">
              <p className="section-en">PROCESS</p>
              <h2>導入の流れ</h2>
            </div>

            <div className="process-line">
              <div>
                <span>01</span>
                <h3>業務ヒアリング</h3>
                <p>現状の業務、課題、使っている資料やシステムを確認します。</p>
              </div>
              <div>
                <span>02</span>
                <h3>設計・試作</h3>
                <p>必要な画面、データ、AIの役割を整理し、小さく試作します。</p>
              </div>
              <div>
                <span>03</span>
                <h3>開発・連携</h3>
                <p>Webシステム、DB、API、クラウド、AI連携を構築します。</p>
              </div>
              <div>
                <span>04</span>
                <h3>運用改善</h3>
                <p>実際の利用状況を見ながら、機能や業務フローを改善します。</p>
              </div>
            </div>
          </div>
        </section>

        <section id="company" className="section company-section">
          <div className="container company-grid">
            <div className="company-photos">
              <div className="photo-placeholder">OFFICE PHOTO</div>
              <div className="photo-placeholder large">COMPANY PHOTO</div>
            </div>

            <div>
              <p className="section-en">COMPANY</p>
              <h2>正創株式会社について</h2>
              <p>
                正創株式会社は、ITシステムの企画・開発・運営を行う会社です。
                お客様の業務を理解し、必要な仕組みを一緒に考え、実際に使えるシステムとして形にします。
              </p>
              <p>
                単なる開発だけでなく、業務フローの整理、クラウド環境の構築、AI Agent の活用まで含めて、
                現場の負担を減らす仕組みづくりを支援します。
              </p>
              <p>
                中小企業、自治体、介護、建築、運送など、現場ごとの課題に合わせて、
                小さく始めて育てていけるIT導入を重視しています。
              </p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-inner">
            <div>
              <p>CONTACT</p>
              <h2>業務システム開発・DX化・AI Agent 導入をご相談ください。</h2>
            </div>
            <a className="btn white" href="#contact">お問い合わせ</a>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div className="container footer-grid">
          <div>
            <h3>正創株式会社</h3>
            <p>ITシステム / 企画・開発・運営</p>
            <p>System Development / DX / AI Agent</p>
          </div>

          <div>
            <h3>お問い合わせ</h3>
            <p>Mail：your-email@example.com</p>
            <p>Location：Japan</p>
            <p>Service：業務システム開発 / DX化支援 / AI Agent導入</p>
          </div>

          <div>
            <h3>主な対応領域</h3>
            <p>業務管理システム</p>
            <p>AI電話受付 / Webチャット窓口</p>
            <p>AWSクラウド構築</p>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Seiso Co., Ltd. All Rights Reserved.
        </div>
      </footer>
    </div>
  )
}

const initialMessages = [
  {
    id: 1,
    role: 'agent',
    text: 'こんにちは。業務相談、AI Agent 導入、システム開発について気軽に話してください。',
    time: 'Now',
  },
  {
    id: 2,
    role: 'agent',
    text: 'この画面は将来 OpenClaw に接続する想定で、今はフロント側の仮応答で動いています。',
    time: 'Now',
  },
]

async function requestOpenClaw(message, history) {
  try {
    const response = await fetch('/api/openclaw/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history: history.map(({ role, text }) => ({ role, text })),
      }),
    })

    if (!response.ok) {
      throw new Error('OpenClaw endpoint is not ready')
    }

    const data = await response.json()
    return data.reply || data.message || 'OpenClaw から返信がありました。'
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 650))
    return '受け取りました。現在は OpenClaw バックエンド未接続のため、仮応答を返しています。次の段階で LLM やデータベース連携をここに接続できます。'
  }
}

function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messageEndRef = useRef(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isSending])

  const sendMessage = async (event) => {
    event.preventDefault()

    const trimmed = input.trim()
    if (!trimmed || isSending) {
      return
    }

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setIsSending(true)

    const reply = await requestOpenClaw(trimmed, nextMessages)

    setMessages((current) => [
      ...current,
      {
        id: Date.now() + 1,
        role: 'agent',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setIsSending(false)
  }

  return (
    <div className="chat-page">
      <header className="chat-topbar">
        <a className="chat-back" href="#home">Home</a>
        <div className="chat-profile">
          <div className="chat-avatar">AI</div>
          <div>
            <h1>OpenClaw Agent</h1>
            <p>AI Agent / DX Consultation</p>
          </div>
        </div>
        <span className="chat-status">Online</span>
      </header>

      <main className="chat-shell">
        <section className="chat-panel" aria-label="AI chat window">
          <div className="chat-date">Today</div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div className={`chat-row ${message.role}`} key={message.id}>
                {message.role === 'agent' && <div className="message-avatar">AI</div>}
                <div className="message-stack">
                  <div className="message-bubble">{message.text}</div>
                  <span className="message-time">{message.time}</span>
                </div>
              </div>
            ))}

            {isSending && (
              <div className="chat-row agent">
                <div className="message-avatar">AI</div>
                <div className="message-stack">
                  <div className="message-bubble typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}

            <div ref={messageEndRef} />
          </div>

          <form className="chat-composer" onSubmit={sendMessage}>
            <button className="composer-icon" type="button" aria-label="Add attachment">+</button>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  sendMessage(event)
                }
              }}
              rows="1"
              placeholder="メッセージを入力"
            />
            <button className="send-button" type="submit" disabled={!input.trim() || isSending}>
              Send
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
