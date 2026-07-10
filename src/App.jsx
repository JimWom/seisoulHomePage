import { useEffect, useRef, useState } from 'react'
import './App.css'

const chatApiBaseUrl = import.meta.env.VITE_CHAT_API_BASE_URL || ''
const chatApiEndpoint = chatApiBaseUrl
  ? `${chatApiBaseUrl.replace(/\/$/, '')}/api/v1/chat`
  : '/api/v1/chat'
const chatSkillCodes = (import.meta.env.VITE_CHAT_SKILL_CODES || 'official-info,lead-support')
  .split(',')
  .map((code) => code.trim())
  .filter(Boolean)
const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''
const turnstileScriptUrl = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
const aiAvatarSrc = '/images/aki.png'
const aiDisplayName = '亜紀'
const aiHeaderName = 'AIアシスタント 亜紀'

const problems  = [
  {
    title: '窓口に追われている',
    text: (
      <>
        電話、メール、対面窓口などの対応が担当者に集中し、記録や引き継ぎが後回しになっている。
      </>
    ),
  },
  {
    title: '映像の確認を人に頼っている',
    text: (
      <>
        カメラ映像や現場動画を人が目視で確認しており、異常や変化の発見が経験と注意力に依存している。
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

const dxInsights = [
  {
    title: 'レガシーシステムの限界',
    text: '長年使い続けた仕組みが複雑化し、データの分断や新しい技術導入の妨げになっています。',
  },
  {
    title: 'データ活用の不足',
    text: '紙やExcelに残る情報をただ保存するだけでなく、判断や改善に使える形へ整えることが重要です。',
  },
  {
    title: '業務変化への対応',
    text: '市場や人手不足の変化に合わせ、現場が無理なく使えるシステムへ継続的に改善する必要があります。',
  },
]

const aiCapabilities = [
  {
    label: 'Visual Intelligence',
    title: '動画・画像認識',
    text: 'カメラ映像から人や物の動き、異常、転倒予兆などを読み取り、現場の安全管理や見守りに活用します。',
  },
  {
    label: 'Intent Recognition',
    title: '意図認識',
    text: '問い合わせ内容や行動履歴から、利用者が今求めていることを捉え、先回りした案内やサポートにつなげます。',
  },
  {
    label: 'Dynamic Adaptation',
    title: '動的判断',
    text: '状況の変化をリアルタイムに把握し、配送ルート変更、優先順位付け、例外対応などを柔軟に判断します。',
  },
]

const aiUseCases = [
  {
    title: '受付業務',
    text: '問い合わせへの一次対応、記録、適切な案内をAIが支援します。',
    image: '/images/uketsuke.png',
    alt: '受付業務でAIが複数チャネルの問い合わせを整理するイメージ',
  },
  {
    title: '建設・製造現場',
    text: '危険行動や異常の検知により、安全管理を効率化します。',
    image: '/images/kojo.png',
    alt: '製造現場でAIがカメラ映像から危険行動を検知するイメージ',
  },
  {
    title: '運輸・物流',
    text: '交通状況や荷主の変更に応じたルート再計算を支援します。',
    image: '/images/unsho.png',
    alt: '物流現場でAIが配送ルートを再計算するイメージ',
  },
  {
    title: '介護現場',
    text: '映像や記録から、言葉になりにくい変化やニーズの把握を支援します。',
    image: '/images/kaigo.png',
    alt: '介護現場でAIが高齢者の変化やニーズの把握を支援するイメージ',
  },
]

const workVideos = [
  {
    title: '映像認識・画像解析',
    text: 'カメラ映像や画像から、人・物・動き・異常を検知します。工場、介護、物流、安全管理などに活用できます。',
    src: '/videos/映像認識・画像解析.mp4',
  },
  {
    title: '対話AI・意図認識',
    text: '問い合わせ内容や会話ログから、利用者が何を求めているかを理解し、案内・分類・記録を支援します。',
    src: '/videos/対話AI・意図認識.mp4',
  },
  {
    title: '業務判断・ルール自動化',
    text: '業務ルール、条件分岐、優先順位を整理し、申請処理、通知、振り分け、例外対応を自動化します。',
    src: '/videos/業務判断・ルール自動化.mp4',
  },
  {
    title: '定型作業・書類入力',
    text: '申請、更新、作業報告記録など、繰り返し発生する作業を自動記録し、スタッフの負担を軽減します。',
    src: '/videos/定型作業・書類入力.mp4',
  },
  {
    title: '業務システム開発',
    text: '管理画面、申請受付、在庫管理、予約管理、顧客管理など、現場に合わせたWebシステムを開発します。',
    src: '/videos/業務システム開発.mp4',
  },
  {
    title: 'データ連携・可視化',
    text: 'Excel、既存システム、問い合わせ履歴、業務データを整理し、検索・集計・ダッシュボード化します。',
    src: '/videos/データ連携・可視化.mp4',
  },
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
            <a href="#home">ホーム</a>
            <a href="#problems">課題</a>
            <a href="#dx-ai">DX・AI</a>
            <a href="#works">保有技術</a>
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
                AI時代へ
                <span>業務をもっとスマートに</span>
              </h1>

              <p className="hero-lead">
                <span>日本のDXとAI発展を推進します</span>
              </p>

              <div className="hero-actions">
                <a className="btn primary" href="#works">技術を見る</a>
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
              <h2>AIが得意の課題分野</h2>
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

        <section id="dx-ai" className="section dx-ai-section">
          <div className="container">
            <div className="section-head dx-ai-head">
              <div>
                <p className="section-en">DX / AI</p>
                <h2>DXとAI化</h2>
              </div>
              <p>
                DXは、単なるデジタル化ではありません。業務プロセス、データ、判断の流れを見直し、
                AIを実務に組み込むことで、現場の負担を減らしながら継続的に改善できる仕組みをつくります。
              </p>
            </div>

            <div className="dx-ai-grid">
              <article className="dx-panel">
                <div className="dx-panel-copy">
                  <span className="panel-label">DX TRANSFORMATION</span>
                  <h3>日本企業が直面する「2025年の崖」</h3>
                  <p>
                    古いシステムや属人化した業務を放置すると、保守コストや判断の遅れが積み重なります。
                    大切なのは、今ある業務を否定することではなく、現場の知見を活かしながらデータが流れる形へ整えることです。
                  </p>
                </div>

                <div className="insight-list">
                  {dxInsights.map((item) => (
                    <div className="insight-item" key={item.title}>
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="dx-panel accent">
                <div className="dx-panel-copy">
                  <span className="panel-label">AI IMPACT</span>
                  <h3>生成AIから、現場で動くAIへ</h3>
                  <p>
                    AIは文章生成だけでなく、映像、音声、ログ、業務データを理解し、次の行動を支援する存在へ進化しています。
                    人が定型作業から解放され、判断や創造的な業務に集中できる環境づくりが重要です。
                  </p>
                </div>

                <div className="capability-list">
                  {aiCapabilities.map((item) => (
                    <div className="capability-card" key={item.title}>
                      <span>{item.label}</span>
                      <strong>{item.title}</strong>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="usecase-panel">
              <div>
                <p className="section-en">USE CASE</p>
                <h3>業界別・AI適用イメージ</h3>
              </div>
              <div className="usecase-card-grid">
                {aiUseCases.map((item) => (
                  <article className="usecase-card" key={item.title}>
                    <img src={item.image} alt={item.alt} />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="works" className="section works-section">
          <div className="container">
            <div className="section-head">
              <p className="section-en">WORKS</p>
              <h2>弊社の保有技術</h2>
              <p className="section-text">
                映像認識、対話AI、業務判断、Webシステム開発、データ連携を組み合わせ、
                現場で実際に使えるDX・AIシステムを構築します。
              </p>
            </div>

            <div className="technology-demo-grid">
              {workVideos.map((item, index) => (
                <article className="technology-demo-card" key={item.title}>
                  <div className="technology-demo-copy">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                  <video controls preload="metadata" playsInline>
                    <source src={item.src} type="video/mp4" />
                    お使いのブラウザは動画再生に対応していません。
                  </video>
                </article>
              ))}
            </div>
            <p className="demo-note">
              ※ 各技術領域ごとにデモ動画を配置できます。動画ファイルは対応する名称で差し替えてください。
            </p>
          </div>
        </section>

        <section id="company" className="section company-section">
          <div className="container company-grid">
            <div className="company-photos">
              <figure className="company-photo portrait">
                <img src="/images/shaChoShaShin.png" alt="代表取締役 王の打ち合わせ風景" />
                <figcaption>代表取締役 王さん</figcaption>
              </figure>
              <figure className="company-photo large">
                <img src="/images/building.jpg" alt="正創株式会社の所在地建物" />
                <figcaption>会社所在地</figcaption>
              </figure>
            </div>

            <div className="company-intro">
              <p className="section-en">COMPANY</p>
              <h2>正創株式会社について</h2>
              <p>
                正創株式会社は、2023年に設立された、ITシステムの企画・開発・運営を行う会社です。
                代表取締役の王は2017年に来日して以来、日本で一貫してシステム開発に携わり、
                現場で培った経験をもとに当社を立ち上げました。
              </p>
              <p>
                日本で多くの方々に支えられ、成長の機会をいただいたことへの感謝を胸に、
                誠実な姿勢でお客様の課題と向き合い、使う人に寄り添った仕組みづくりを大切にしています。
              </p>
              <p>
                日本のIT・DX化には、業務モデル、人材育成、企業文化などさまざまな背景があります。
                当社は微力ながらも、業務フローの整理、Webシステム開発、クラウド活用、AI Agent 導入を通じて、
                日本社会のDX推進に貢献してまいります。
              </p>
              <p className="company-message">
                小さく始め、着実に改善し、長く役に立つITサービスを提供すること。
                それが、正創株式会社の変わらない姿勢です。
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

function loadTurnstile() {
  if (!turnstileSiteKey || window.turnstile) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${turnstileScriptUrl}"]`)

    if (existingScript) {
      existingScript.addEventListener('load', resolve, { once: true })
      existingScript.addEventListener('error', reject, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = turnstileScriptUrl
    script.async = true
    script.defer = true
    script.addEventListener('load', resolve, { once: true })
    script.addEventListener('error', reject, { once: true })
    document.head.appendChild(script)
  })
}

async function getRobotCheckToken(widgetRef, widgetIdRef) {
  if (!turnstileSiteKey) {
    return ''
  }

  await loadTurnstile()

  return new Promise((resolve, reject) => {
    if (!window.turnstile || !widgetRef.current) {
      reject(new Error('Robot check is not ready'))
      return
    }

    const handleError = () => {
      reject(new Error('Robot check failed'))
    }

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current)
      widgetIdRef.current = null
    }

    widgetIdRef.current = window.turnstile.render(widgetRef.current, {
      sitekey: turnstileSiteKey,
      action: 'chat',
      size: 'invisible',
      callback: resolve,
      'error-callback': handleError,
      'expired-callback': handleError,
    })

    window.turnstile.execute(widgetIdRef.current, { action: 'chat' })
  })
}

function readChatReply(data) {
  const lastMessage = Array.isArray(data.messages) ? data.messages[data.messages.length - 1] : null

  return (
    data.reply ||
    data.message ||
    data.answer ||
    data.content ||
    data.assistantMessage?.content ||
    lastMessage?.text ||
    lastMessage?.content ||
    'OpenClaw から返信がありました。'
  )
}

async function readApiError(response) {
  try {
    const data = await response.json()
    return data.message || '送信できませんでした。時間をおいてもう一度お試しください。'
  } catch {
    return '送信できませんでした。時間をおいてもう一度お試しください。'
  }
}

async function requestChat({ message, sessionId, robotToken }) {
  const robotCheck = robotToken
    ? {
        token: robotToken,
        action: 'chat',
      }
    : null

  const response = await fetch(chatApiEndpoint, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionId,
      message,
      robotCheck,
      skillCodes: chatSkillCodes,
    }),
  })

  if (!response.ok) {
    throw new Error(await readApiError(response))
  }

  const data = await response.json()
  return {
    sessionId: data.sessionId || sessionId,
    reply: readChatReply(data),
  }
}

function AIAvatar({ className }) {
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <div className={className}>
      {!hasImageError && (
        <img
          src={aiAvatarSrc}
          alt="AI assistant"
          onError={() => setHasImageError(true)}
        />
      )}
      {hasImageError && <span>AI</span>}
    </div>
  )
}

function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const messageEndRef = useRef(null)
  const turnstileRef = useRef(null)
  const turnstileWidgetIdRef = useRef(null)

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

    try {
      const robotToken = await getRobotCheckToken(turnstileRef, turnstileWidgetIdRef)
      const result = await requestChat({
        message: trimmed,
        sessionId,
        robotToken,
      })

      setSessionId(result.sessionId)
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'agent',
          text: result.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'agent',
          text: error.message || '送信できませんでした。時間をおいてもう一度お試しください。',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="chat-page">
      <header className="chat-topbar">
        <a className="chat-back" href="#home">Home</a>
        <div className="chat-profile">
          <AIAvatar className="chat-avatar" />
          <div>
            <h1>{aiHeaderName}</h1>
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
                {message.role === 'agent' && <AIAvatar className="message-avatar" />}
                <div className="message-stack">
                  {message.role === 'agent' && <span className="message-sender">{aiDisplayName}</span>}
                  <div className="message-bubble">{message.text}</div>
                  <span className="message-time">{message.time}</span>
                </div>
              </div>
            ))}

            {isSending && (
              <div className="chat-row agent">
                <AIAvatar className="message-avatar" />
                <div className="message-stack">
                  <span className="message-sender">{aiDisplayName}</span>
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

          {turnstileSiteKey && <div className="turnstile-widget" ref={turnstileRef} />}

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
